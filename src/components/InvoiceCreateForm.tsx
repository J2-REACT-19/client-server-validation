"use client";
import {  useActionState, useState } from "react";
import { createInvoice } from "../actions/create-invoice";
import {
  ActionState,
  EMPTY_ACTION_STATE,
  fromErrorToActionState,
} from "../helpers/handler-action-state";
import { FieldError } from "./FieldError";
import { createInvoiceSchema } from "../helpers/validationSchema";

export const InvoiceCreateForm = () => {
  const [validation, setValidation] = useState<ActionState | null>(null);
  const [actionState, formAction] = useActionState(
    (actionState: ActionState, formData: FormData) =>
      createInvoice(actionState, formData),
    EMPTY_ACTION_STATE
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    setValidation(null);
    try {
      createInvoiceSchema.parse(formData);
    } catch (error) {
      console.log(error)
      setValidation(fromErrorToActionState(error));
      event.preventDefault();
    }
  };

  
  return (
    <div className="grid place-items-center h-screen border border-red-600 ">
      <form action={formAction} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 border border-red-600 ">
          <div className="flex gap-2 items-end">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="name"
              className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg focus:ring-1 focus:border-[#0fac4b] focus:ring-[#0fac4b] p-2.5"
            />
            {/* Si validation es null la validacion se realizara en el servidor */}
            <FieldError actionState={validation ?? actionState} name="title" />
          </div>
          <div className="flex gap-2 items-end">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg focus:ring-1 focus:border-[#0fac4b] focus:ring-[#0fac4b] p-2.5"
            />
            {/* Si validation es null la validacion se realizara en el servidor */}
            {/* <span>{actionState.fieldErrors.amount?.[0]}</span> */}
            <FieldError actionState={validation ?? actionState} name="amount" />
          </div>

          <div className="flex gap-2">
            <label htmlFor="draft">Draft:</label>
            <input type="checkbox" name="draft" id="draft" />
            {/* Si validation es null la validacion se realizara en el servidor */}
            <FieldError actionState={validation ?? actionState} name="draft" />
          </div>

          <div className="flex gap-2">
            <label htmlFor="feature1">Feature 1:</label>
            <input
              type="checkbox"
              name="features"
              value="feature1"
              id="feature1"
            />
          </div>

          <div className="flex gap-2">
            <label htmlFor="feature2">Feature 2:</label>
            <input
              type="checkbox"
              name="features"
              value="feature2"
              id="feature2"
            />
            <FieldError actionState={actionState} name="draft" />
          </div>

          <div className="flex flex-col justify-center items-center">
            <button className="border-2 border-gray-600 rounded-lg" type="submit">Send</button>
            {/* Si validation es null la validacion se realizara en el servidor */}
            <span className="text-xs text-red-500">{validation ? validation.message : actionState.message}</span>
          </div>
        </div>
      </form>
    </div>
  );
};
