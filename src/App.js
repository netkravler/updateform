import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const App = ({
  dataObj /**the data object you wish to edit */,
  edit /**if this is true you are in editmode else you will save a new dataobject */,
  setEdit /** here you can change the editmode */,
}) => {
  const { newData, changeData } = "useDataStore()";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    return edit ? updateData(data) : setData(data);
  };

  //** the function to create a new post */
  const setData = async (data) => {
    const formData = {
      title: data.title,
    };

    const response = await newData(formData);

    console.log(response);

    setValue(null);
    reset();
  };

  //** the updata function */
  const updateData = async (data) => {
    const formData = {
      title: data.title,
      id: data.id,
    };

    const response = await changeData(formData);

    console.log(response);

    setValue(null);
    setEdit(false);
    reset();
  };

  useEffect(() => {
    //** in edit mode this useeffec listen for change and add those changes to the setValue in react-hook-form */
    if (dataObj) {
      setValue("id", dataObj.id);
      setValue("title", dataObj.title);
    }
  }, [dataObj, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <article>
        <div>
          <input type="text" {...register("title", { required: "Du mangler at tilføje title", minLength: { value: 5, message: "der skal være minimum 5 karakterer" } })} placeholder="Title" />

          {errors.title?.message && <span role="alert">{errors.title?.message}</span>}
        </div>
      </article>
      <button>{edit ? "Update" : "Send"}</button>
    </form>
  );
};

export default App;
