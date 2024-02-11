 import './NewProduct.scss';
 import { useForm } from 'react-hook-form';
 import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
 function NewProduct() {
     const { register } = useForm();

     return (
        <div className="outer-container-new-product">
            <form className="form-new-product">
                <h2><GreenDot className="green-dot-title"/> Voeg jouw RiDesign toe <GreenDot className="green-dot-title"/></h2>

                <label htmlFor="title-field">
                    Producttitel/ naam
                    <input
                    type="text"
                    id="title-field"
                    {...register("title")}
                        className="input-form"
                    />
                </label>

                <label htmlFor="photo-field">
                    Fotos uploaden
                    <input
                        type="file"
                        id="photo-field"
                        {...register("photos")}
                        className="input-form-photo"
                        multiple
                    />
                </label>


            </form>
        </div>
     )
 }

 export default NewProduct;