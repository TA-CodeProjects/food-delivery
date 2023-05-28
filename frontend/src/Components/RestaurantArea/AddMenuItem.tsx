import { useAppDispatch } from "../../app/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MenuPayloadModel } from "../../Models/RestaurantModel";
import { createMenuItem } from "../../features/menus/menuSlice";
import { useNavigate, useParams } from "react-router-dom";


function AddMenuItem() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id || ""

  const schema = yup.object().shape({
    item: yup.string().required("Item name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().positive(),
    image: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<MenuPayloadModel>({ mode: "all", resolver: yupResolver(schema) });

  const addMenu = (model: MenuPayloadModel) => {
    const menuModel = new MenuPayloadModel(id, model.item, model.description, model.price, model.image)
    dispatch(createMenuItem(menuModel));
    navigate(`/restaurant/${id}`)
  };
  return (
    <>
      <section className="heading">
        <p>Please add items to menu</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit(addMenu)}>
          <div className="form-group">
            <input
              {...register("item")}
              type="text"
              className="form-control"
              placeholder="Enter menu item name"
            />
            <span className="">{errors.item?.message}</span>
          </div>
          <div className="form-group">
            <input
              {...register("description")}
              type="text"
              className="form-control"
              placeholder="Enter description"
            />
            <span className="">{errors.description?.message}</span>
          </div>
          <div className="form-group">
            <input
              {...register("price")}
              type="number"
              className="form-control"
              placeholder="Enter price"
            />
            <span className="">{errors.price?.message}</span>
          </div>
          <div className="form-group">
            <input
              {...register("image")}
              type="text"
              className="form-control"
              placeholder="Enter image"
            />
            <span className="">{errors.image?.message}</span>
          </div>
          <div className="form-group">
            <button disabled={!isValid || !isDirty} type="submit" className="btn block">
              Add Item
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddMenuItem;