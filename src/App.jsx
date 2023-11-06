import {useForm} from 'react-hook-form'
import {DevTool} from "@hookform/devtools"
import "./App.css"

export default function App() {
    const form = useForm({
        defaultValues: {
            //you call api and set data default value
            username: "khalid",
            email: "khalid@gmail.com",
            social: {
                facebook: ''
            },
            proneNumbers: ["", ""],
            interests: []
        }
    })
    const {register, control, handleSubmit, formState} = form
    const {errors} = formState;
    const onSubmit = (data) => {
        console.log("submit", data)
    }
    return (
        <div className='App'>
            <h1>R Hook Form Example</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <label>UserName: </label>
                    <input
                        type='text'
                        placeholder="Enter Name"
                        {...register("username", {
                            required: 'Username is required'
                        })}
                    />
                    <small className="error">{errors.username?.message}</small>
                </div>
                <div>
                    <label>Email: </label>
                    <input type='email' placeholder="Enter Email"
                           {...register("email", {
                               required: {
                                   value: true,
                                   message: 'Emil is required'
                               },
                               pattern: {
                                   value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                   message: "Invalid email address"
                               },
                               validate: {
                                   allowEmail: (fieldValue) => {
                                       return fieldValue?.endsWith('gmail.com') || "Only allow gmail account"
                                   },
                               }
                           })}
                    />
                    <small className="error">{errors.email?.message}</small>
                </div>
                <div>
                    <label>Facebook: </label>
                    <input
                        type='text'
                        placeholder="Enter Facebook url"
                        {...register("social.facebook", {
                            required: 'facebook url is required'
                        })}
                    />
                    <small className="error">{errors.social?.facebook?.message}</small>
                </div>
                <div>
                    <label>Primary Phone: </label>
                    <input
                        type='text'
                        placeholder="Enter Primary Phone"
                        {...register("proneNumbers.0", {
                            required: 'Primary phone is required'
                        })}
                    />
                    <small className="error">{errors?.proneNumbers && errors.proneNumbers[0].message}</small>
                </div>
                <div>
                    <label>Secondary Phone: </label>
                    <input
                        type='text'
                        placeholder="Enter Secondary Phone"
                        {...register("proneNumbers.1")}
                    />
                </div>

                <div>
                    <label>Facebook: </label>
                    <select
                        {...register("interests", {
                            required: 'interests is required'
                        })}
                        multiple
                    >
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="REACT">REACT</option>
                        <option value="VUE">VUE</option>
                    </select>
                    <small className="error">{errors?.interests?.message}</small>
                </div>
                <button type="submit">Submit</button>
            </form>

            <DevTool control={control}/>
        </div>
    );
}