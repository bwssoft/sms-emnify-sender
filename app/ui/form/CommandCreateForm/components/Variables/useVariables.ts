import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { IVariableSchema, IVariablesType } from ".";

const schema = z.object({
  name: z.string().min(1, 'Informe o nome da variavél'),
  description: z.string().optional()
})

export type VariableFormData = z.infer<typeof schema>;

export const useVariables = (props: IVariablesType) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<VariableFormData>({
    resolver: zodResolver(schema)
  })

  const onHandleSubmit = handleSubmit(async (data) => {
    const arrayData = props.variables;
    arrayData.push(data);
    props.onSubmit(arrayData);
    reset()
  });

  const onHandleClear = (index: number) => {
    const arrayData = props.variables;
    arrayData.splice(index, 1);
    props.onSubmit(arrayData);
  }

  return {
    register,
    onHandleSubmit,
    errors,
    onHandleClear
  }
}