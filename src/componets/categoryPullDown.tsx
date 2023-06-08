import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import useGetCategory from "../hooks/useGetCategory";
// 管理画面カテゴリのプルダウン

type Props = {
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
};
const CategoryPullDown = ({ selectedCategory, onChangeCategory }: Props) => {
  const { categories } = useGetCategory();

  const handleChange = (event: SelectChangeEvent) => {
    const category = event.target.value;
    onChangeCategory(category); // 親コンポーネントに選択されたカテゴリを渡す
  };
  console.log(selectedCategory, "value");
  console.log(handleChange, "handle");
  return (
    <>
      <FormControl sx={{ my: 4, minWidth: 120, mx: 2 }} size="small">
        <InputLabel id="demo-select-small">カテゴリ名</InputLabel>
        <Select
          id="demo-select-small"
          value={selectedCategory}
          label="カテゴリ名"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>全て</em>
          </MenuItem>
          {categories?.map((data: { name: string; id: number }) => {
            return (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default CategoryPullDown;
