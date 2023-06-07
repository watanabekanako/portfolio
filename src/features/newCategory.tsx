import { Button, Paper, Stack, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
type Inputs = {
  newCategoryName: string;
};
const NewCategory = () => {
  // snackbarのbooleanの管理
  const [open, setOpen] = React.useState(false);
  // react-chook-form
  const { control, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: { newCategoryName: "" },
  });
  const [allCategory, setAllCategory] = React.useState<
    | {
        categories: { name: string; id: number }[];
      }
    | undefined
  >();
  const [selectedCategory, setSelectedCategory] = React.useState<
    | {
        category: { name?: string; id?: number };
      }
    | undefined
  >();
  // エラーメッセージの管理
  React.useEffect(() => {
    axios.get("posts/categories").then((response) => {
      setAllCategory(response.data);
    });
  }, []);
  const validationRules = {
    name: {
      required: "新しいカテゴリ名を入力してください",
      maxLength: { value: 6, message: "6文字以内で入力してください" },
      validate: {
        categoryExists: (value: string) => {
          const categoryExists = allCategory?.categories.some(
            (category: { name: string }) => category.name === value
          );
          if (categoryExists) {
            return "入力されたカテゴリ名は既に存在します";
          }
          return true;
        },
      },
    },
  };
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const errors: { name?: string } = {};
    if (Object.keys(errors).length === 0) {
      await axios.post(`/posts/categories/`, { name: data.newCategoryName });

      axios.get("/posts/categories").then((response) => {
        setAllCategory(response.data);
        reset({ newCategoryName: "" });
      });
      setOpen(true);
    }
  };
  return (
    <>
      <Paper sx={{ py: 4, px: 2, textAlign: "center" }}>
        <Stack
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
        >
          <Controller
            name="newCategoryName"
            control={control}
            rules={validationRules.name}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                placeholder="カテゴリ名を入力してください"
              />
            )}
          />
          <Button type="submit" variant={"contained"} sx={{ my: 4 }}>
            新規カテゴリーを追加する
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default NewCategory;
