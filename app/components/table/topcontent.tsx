import React from "react";
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ChevronDownIcon } from "../svgs/ChevronDownIcon";
import { PlusIcon } from "../svgs/PlusIcon";
import { SearchIcon } from "../svgs/SearchIcon";
import { usePathname } from 'next/navigation';

interface TopContentProps {
  filterValue: string;
  statusFilter: string | Set<string>;
  visibleColumns: Set<string | number>;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  handleOpenModal: () => void;
  statusOptions: { uid: string; name: string }[];
  columns: { uid: string; name: string; sortable?: boolean }[];
  setVisibleColumns: () => void;
  setStatusFilter: () => void;
}

const TopContent: React.FC<TopContentProps> = ({
  filterValue,
  statusFilter,
  visibleColumns,
  onRowsPerPageChange,
  onSearchChange,
  onClear,
  handleOpenModal,
  statusOptions,
  columns,
  setVisibleColumns,
  setStatusFilter
}) => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
                {statusOptions.length > 0 &&
                <Dropdown style={{ color: 'black' }}>
                    <DropdownTrigger className="hidden sm:flex">
                        <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                        Status
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Status Options"
                        closeOnSelect={false}
                        selectedKeys={statusFilter}
                        selectionMode="multiple"
                        onSelectionChange={setStatusFilter as any}
                    >
                        {statusOptions.map((status) => (
                        <DropdownItem key={status.uid} className="capitalize">
                            {status.name}
                        </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                }
              <Dropdown style={{ color: 'black' }}>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Column Options"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns as any}
                    >
                    {columns.map((column) => (
                        <DropdownItem key={column.uid} className="capitalize">
                        {column.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
              {pathname === '/admin/Product' &&
              <Button color="primary" endContent={<PlusIcon />} onPress={handleOpenModal}>
                Add New
              </Button> }
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total users</span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
    </div>
  );
};

export default TopContent;
