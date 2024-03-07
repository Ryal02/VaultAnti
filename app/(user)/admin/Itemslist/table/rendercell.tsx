'use client';
import React from "react";
import { User, Chip, Tooltip } from "@nextui-org/react";// Import your UI components/icons as needed
import { EditIcon } from "@/app/components/svgs/EditIcon";
import { DeleteIcon } from "@/app/components/svgs/DeleteIcon";
import { EyeIcon } from "@/app/components/svgs/EyeIcon";

type ItemType = {
  name: string;
  email: string;
  role: string;
  team: string;
  status: string;
  avatar: string;
  // Add other properties as needed
};

const generateKey = () => {
    return `_${Math.random().toString(36).substr(2, 9)}`;
};
  

type ValidColor = "success" | "danger" | "warning" | "default" | "primary" | "secondary" | undefined;

const statusColorMap: Record<string, ValidColor> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

export const renderCell = (user: ItemType, columnKey: string) => {
  const cellValue = user[columnKey as keyof ItemType];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{ radius: "lg", src: user.avatar }}
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </User>
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
        </div>
      );
    case "status":
    //   const color: ValidColor = statusColorMap[user.status];
      return (
        <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
          {cellValue}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip style={{ color: "black" }} content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip style={{ color: "black" }} content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip style={{ color: "black" }} color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    default:
    return <div key={generateKey()}>{cellValue}</div>;
  }
};
