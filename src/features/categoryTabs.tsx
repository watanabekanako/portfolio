import { Tab, Tabs } from "@mui/material";
import React from "react";
type Props = {
  categoryName?: { name: string; id: number }[];
  searchParams: URLSearchParams;
  // onChange: (event: React.SyntheticEvent, value: string) => void;
  onChange: any;
};

const CategoryTabs = ({ categoryName, searchParams, onChange }: Props) => {
  const a11yProps = (id: number) => {
    return {
      id: `simple-tab-${id}`,
      "aria-controls": `simple-tabpanel-${id}`,
    };
  };
  console.log({ categoryName, searchParams, onChange }, "props");
  return (
    <Tabs
      value={searchParams.get("category") || ""}
      onChange={(event, newValue) => onChange(newValue)}
    >
      <Tab
        label="All"
        {...a11yProps(0)}
        value={""}
        sx={{
          backgroundColor: "rgba(189, 189, 189, 0.17)",
          marginRight: 2,
        }}
      />
      {categoryName?.map((data: { name: string; id: number }) => {
        return (
          // フラグメントの削除にてタブの挙動正常化
          // 下記コンポーネントは直下に置かないと動かない
          <Tab
            key={data.id}
            label={data.name}
            {...a11yProps(data.id)}
            value={String(data.id)}
            sx={{
              backgroundColor: "rgba(189, 189, 189, 0.17)",
              marginRight: 2,
            }}
          />
        );
      })}
    </Tabs>
  );
};

export default CategoryTabs;
