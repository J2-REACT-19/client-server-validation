"use server"
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "../helpers/handler-action-state";
import { createInvoiceSchema } from "../helpers/validationSchema";

//Usamos zod-form-data que es un helper para zod que nos ayuda a evitar hacer validaciones adicionales ya que todo el formdata llega como string.


export const createInvoice = async (_actionState:ActionState,formData: FormData) => {
  try {
    const { title, amount, draft, features } =
      createInvoiceSchema.parse(formData);

    console.log(title, amount, draft, features);
  } catch (error) {
    return fromErrorToActionState(error);
  }
  return toActionState("Invoice Created");
};
