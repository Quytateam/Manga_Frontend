import toast from "react-hot-toast";
import Axios from "./Axios";

const uploadProfileService = async (file, setLoading) => {
  try {
    setLoading(true);
    const { data } = await Axios.post("/cloud/profile", file);
    setLoading(false);
    toast.success("Upload file successfully");
    return data;
  } catch (error) {
    setLoading(false);
    toast.error("Error! An error occurred. Please try again later");
  }
};

const uploadImage = async (formData, setLoading) => {
  try {
    setLoading(true);
    const { data } = await Axios.post("/cloud/upload", formData);
    setLoading(false);
    toast.success("Upload file successfully");
    return data;
  } catch (error) {
    setLoading(false);
    toast.error("Error! An error occurred. Please try again later");
  }
};

export { uploadProfileService, uploadImage };
