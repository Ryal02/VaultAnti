'use client';
import React from "react";
import { User, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/components/svgs/EditIcon";
import { DeleteIcon } from "@/app/components/svgs/DeleteIcon";
import { EyeIcon } from "@/app/components/svgs/EyeIcon";

const generateKey = () => {
    return `_${Math.random().toString(36).substr(2, 9)}`;
};

export const renderCell = (user: any, columnKey: string) => {
  const cellValue = user[columnKey as any];

  switch (columnKey) {
    case "_id":
      return (
          <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
      );
    case "name":
      return (
          <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
      );
    case "type":
        return (
            <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
        );
    case "quantity":
      return (
          <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
      );
    case "expire":
      const createdAtDate = new Date(user.createdAt);
    const formattedDate = createdAtDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(/\//g, '-');
      return (
          <div className="flex flex-col">
              <p className="text-bold text-small capitalize">created: {formattedDate}</p>
              <p className="text-bold text-tiny capitalize text-default-400">Expire: {cellValue}</p>
          </div>
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
