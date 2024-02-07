import{ ErrorMessage, useField} from 'formik'

export const TextField = ({name,...props}) =>{
    const[inputData,meta] =useField(props);
    return(
        <div className="mb-2">
            <label htmlFor={inputData.name}>{name}</label>
            
            <input
            className={`form-control form-control-lg ${meta.touched && meta.error && 'is-invalid'}`}
                {...inputData} {...props} 
                autoComplete="on"
                />
                <ErrorMessage component="div" name={inputData.name} className="error/"/>
        </div>
    )
}