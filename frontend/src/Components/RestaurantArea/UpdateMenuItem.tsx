import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormState } from "react-hook-form";
import { MenuModel } from "../../Models/RestaurantModel";
import { updateMenuItem } from "../../features/menus/menuSlice";

function UpdateMenuItem() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const params = useParams();
    const menuId = params.menuId || "";
    const restaurantId = params.restaurantId || "";

    const menu = useAppSelector(
      (state) => state.menus.menus.filter((menu) => menu.id === menuId)[0]
    );

    const schema = yup.object().shape({
    item: yup.string().required("Item name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().positive(),
    image: yup.string(),
  });

    let defaultValueObj = { ...menu };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid}
    } = useForm<MenuModel>({ defaultValues: defaultValueObj, mode: "all", resolver: yupResolver(schema) })

    const { dirtyFields } = useFormState({ control })

    const updateMenu = (model: MenuModel) => {
        const menuModel = new MenuModel(
          menuId,
          model.restaurant,
          model.item,
          model.description,
          model.price,
          model.image,
          model.quantity
        );
        dispatch(updateMenuItem(menuModel));
        navigate(`/restaurant/${restaurantId}`)
    }

    return (
      <section className="form">
        <form onSubmit={handleSubmit(updateMenu)}>
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
              Update Item
            </button>
          </div>
        </form>
      </section>
    );
}

export default UpdateMenuItem;