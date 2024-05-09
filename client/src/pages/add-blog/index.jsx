import { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddNewBlog() {
  const { formData, setFormData, isCurrentData, setIsCurrentData } =
    useContext(GlobalContext);
  const Navigate = useNavigate();
  const location = useLocation();

  console.log(formData);

  async function handleSaveBlog() {
    const response = isCurrentData
      ? await axios.put(
          `http://localhost:5000/api/blogs/update/${location.state.getCurrentBlogItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:5000/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });

    const result = await response.data;

    console.log(result);
    if (result) {
      setIsCurrentData(false)
      setFormData({
        title: "",
        description: "",
      });
      Navigate("/");
    }
  }

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsCurrentData(true);
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description,
      });
    }
  }, [location]);

  return (
    <div className={classes.wrapper}>
      <h1>{isCurrentData ? "Edit a Blog" : "Add a blog"}</h1>
      <div className={classes.formwrapper}>
        <input
          name="title"
          placeholder="Enter blog title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          placeholder="Enter Blog Description"
          id="description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
        />

        <button onClick={handleSaveBlog}>
          {isCurrentData ? "Edit a Blog" : "Add a blog"}
        </button>
      </div>
    </div>
  );
}
