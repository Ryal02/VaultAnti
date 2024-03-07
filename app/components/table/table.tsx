// CustomTable.tsx

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
// import { renderCell } from "./rendercell";

interface CustomTableProps {
  headerColumns: any[];
  bottomContent: React.ReactNode;
  selectedKeys: Set<number> | string;
  sortDescriptor: any;
  topContent: React.ReactNode;
  onSelectionChange: (keys: string | Set<number>) => void;
  onSortChange: (sort: any) => void;
  sortedItems: any[];
  renderCell: (user: any, columnKey: string) => React.ReactNode;
}

const CustomTable: React.FC<CustomTableProps> = ({
  headerColumns,
  bottomContent,
  selectedKeys,
  sortDescriptor,
  topContent,
  onSelectionChange,
  onSortChange,
  sortedItems,
  renderCell,
}) => {
  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-screen",
      }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={(keys) => onSelectionChange(keys as string | Set<number>)}
      onSortChange={onSortChange}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
            {(item) => (
                <TableRow key={item._id??item.id}>
                {headerColumns.map((column) => (
                        <TableCell key={column.uid}>
                        {renderCell(item, column.uid)}
                        </TableCell>
                    ))}
                </TableRow>
            )}
        </TableBody>
    </Table>
  );
};

export default CustomTable;
