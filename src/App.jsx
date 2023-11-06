import {useForm, useFieldArray} from 'react-hook-form'
import {DevTool} from "@hookform/devtools"
import "./App.css"
import {useEffect} from "react";

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
            interests: [],
            companies: [
                {
                    name: ''
                }
            ],
            age: ''
        }
    })
    const {register, control, handleSubmit, formState, watch} = form
    const {errors} = formState;

    const {fields, append, remove} = useFieldArray({
        name: 'companies',
        control
    })

    useEffect(() => {
        const subscription = watch((value) => {
            console.log(value)
        })
        return () => subscription.unsubscribe()
    }, [watch]);
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
                    <label>Interests: </label>
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

                {
                    fields.map((field, index) => (
                        <div
                        key={index}
                        >
                            <label>Company -  {index+1}: </label>
                            <input
                                type='text'
                                placeholder="Enter Name"
                                {...register(`companies.${index}.name`, {
                                    required: `Company ${index+1} is required`
                                })}
                            />
                            {
                                index === 0 && <button onClick={() => append({name: ''})}>+</button>
                            }
                            {
                                index !== 0 && <button onClick={() => remove(index)}>-</button>
                            }

                            <small className="error">{errors?.companies && errors?.companies[index]?.name.message}</small>
                        </div>


                    ))
                }

                <div>
                    <label>Age: </label>
                    <input
                        type='number'
                        placeholder="Enter Age"
                        {...register('age', {
                            valueAsNumber: true,
                            required: {
                                value: true,
                                message: 'Age is required'
                            }
                        })}
                    />
                    <small className="error">{errors?.age?.message}</small>

                </div>

                <button type="submit">Submit</button>
            </form>

            <DevTool control={control}/>
        </div>
    );
}