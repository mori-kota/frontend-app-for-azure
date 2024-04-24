import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
//import { DevTool } from "@hookform/devtools";
import AlertContext from '@/_contexts/alert.context';
import { create } from '@/_services/inquiry.service';

function Inquiries() {
  const [, setAlert] = useContext(AlertContext);
  const showAlert = (message, type) => {
    console.log(message);

    setAlert({
      message,
      type,
    });
  };
  
  // form validation rules 
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('タイトル は必須項目です。'),
    email: Yup.string()
      .email('メールアドレス に誤りがあります。')
      .required('メールアドレス は必須項目です。'),
    inquiry: Yup.string()
      .required('内容 は必須項目です'),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, formState } = useForm({defaultValues: { title: '', email: '', inquiry: '' },
    resolver: yupResolver(validationSchema)
  });

  function onSubmit(data) {
    return create(data)
      .then((response) => {
        showAlert(response.message, 'success');
        reset();
      })
      .catch((error) => {
        console.log(error);
        showAlert(error.message || error, 'danger');
      });
  }
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-group col-12">
            <label>タイトル</label>
            <input type="text" {...register("title")} className={`form-control ${formState.errors.title ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{formState.errors.title?.message}</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-6">
            <label>メールアドレス</label>
            <input type="text" {...register("email")} className={`form-control ${formState.errors.email ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{formState.errors.email?.message}</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-12">
            <label>内容</label>
            <textarea rows="3" {...register("inquiry")} className={`form-control ${formState.errors.inquiry ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{formState.errors.inquiry?.message}</div>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            送信
          </button>
          <button type="button" className="btn btn-link reset-btn" onClick={() => reset()}>リセット</button>
        </div>
      </form>
      {/* <DevTool control={control} /> set up the dev tool */}
    </>
  );
}

export { Inquiries };