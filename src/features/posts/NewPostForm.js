import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsApiSlice";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import WysiwygEditor from "../../components/WysiwygEditor";

const NewPostForm = () => {
  const { id } = useAuth();
  const [addNewPost, { isLoading, isSuccess, isError, error }] =
    useAddNewPostMutation();
  const [content, setContent] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      navigate("/dash/posts");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
 

  const onSavePostClicked = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedImage, selectedImage.name);

    await axios
      .post(
        "http://localhost:3500/posts",
        {
          user: id,
          title: title,
          content: content,
          picture: formData
        },
        // {
        //   headers: {
        //     'content-type': 'multipart/form-data'
        //   }
        // }
      )
      .then((res) => console.log(res));
      
      if(formData) {
        await axios
      .post(
        "http://localhost:3500/posts/image",
        formData
      )
      .then((res) => console.log(res));
      }
    
      navigate('/dash')
    // await addNewPost({
    //   // title,
    //   // picture_url: selectedImage,
    //   // user: id,
    //   // category: "category",
    //   picture_url: formData
    // });
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";

  const renderContent = (
    <>
      <div className={errClass}>
        {error?.data?.message}
        <form
          className="form"
          onSubmit={onSavePostClicked}
          encType="multipart/form-data"
        >
          <div className="form__title-row">
            <h2>New Post</h2>
          </div>
          <label className="form__label" htmlFor="title">
            Title:
          </label>
          <input
            className={`form__input ${validTitleClass}`}
            id="title"
            name="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={onTitleChanged}
          />
          <label className="form__label" htmlFor="text">
            Upload your image:
          </label>
          <input
            type="file"
            id="img"
            name="image"
            accept="image/*"
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
            }}
          />
          {selectedImage && (
            <img
              alt="upload foto"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
          )}
          <WysiwygEditor setContent={setContent} />
          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  );

  return renderContent;
};

export default NewPostForm;
