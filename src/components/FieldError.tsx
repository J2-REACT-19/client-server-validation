import { ActionState } from "../helpers/handler-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

export const FieldError = ({ actionState, name }: FieldErrorProps) => {
  const message = actionState.fieldErrors[name]?.[0];

  if (!message) return null;

  return <span className="text-xs text-red-500">{message}</span>;
};
