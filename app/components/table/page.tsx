'use client';

import React from "react";
import { usePathname } from 'next/navigation';
import { useDisclosure } from "@nextui-org/react";
import ModalComponent from "../modals/AddProductModal/page";
import TopContent  from './topcontent';
import BottomContent from "./bottomcontent";
import TableData from './table';

interface AppProps {
    columns: Array<{ uid: string; name: string; sortable?: boolean }>;
    users: ItemType[];
    statusOptions: Array<{ uid: string; name: string }>;
    renderCell: (user: any, columnKey: string) => React.ReactNode;
    initialVisibleColumns: any;
    reload: () => void;
  }
  
type ItemType = {
    id: number;
    name: string;
    role: string;
    team: string;
    status: string;
    age: string;
    avatar: string;
    email: string;
    [key: string]: any;
};

const App: React.FC<AppProps> = ({ columns, users, initialVisibleColumns, statusOptions, renderCell, reload }) => {
    const pathname = usePathname();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Set<number> | string>("");
    const [visibleColumns, setVisibleColumns] = React.useState<Set<string | number>>(
        new Set(initialVisibleColumns)
    );
    const [statusFilter, setStatusFilter] = React.useState<string | Set<string>>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    type SortDescriptor = {
        column: string;
        direction: "ascending" | "descending";
    };
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const handleOpenModal = () => {
        onOpen();
    };

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (typeof visibleColumns === "string" && visibleColumns === "all") {
        return columns;
        }

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((user) =>
            (user.name || user.first_name || user.last_name).toLowerCase().includes(filterValue.toLowerCase())
        );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredUsers = filteredUsers.filter((user) =>
            Array.from(statusFilter).includes(user.status)
        );
        }

        return filteredUsers;
    }, [users, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
        const first = (a as any)[sortDescriptor.column];
        const second = (b as any)[sortDescriptor.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;
    
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);
  
    const onNextPage = React.useCallback(() => {
      if (page < pages) {
        setPage(page + 1);
      }
    }, [page, pages]);
  
    const onPreviousPage = React.useCallback(() => {
      if (page > 1) {
        setPage(page - 1);
      }
    }, [page]);
  
    const onRowsPerPageChange = React.useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
      },
      []
    );
  
    const onSearchChange = React.useCallback(
      (value: string) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
      },
      []
    );
  
    const onClear = React.useCallback(() => {
      setFilterValue("");
      setPage(1);
    }, []);
  
    const topContent = React.useMemo(() => {
        return (
          <TopContent
            filterValue={filterValue}
            statusFilter={statusFilter}
            visibleColumns={visibleColumns}
            onRowsPerPageChange={onRowsPerPageChange}
            onSearchChange={onSearchChange}
            onClear={onClear}
            handleOpenModal={handleOpenModal}
            statusOptions={statusOptions}
            columns={columns}
            setVisibleColumns={setVisibleColumns as any}
            setStatusFilter={setStatusFilter as any}
          />
        );
    }, [filterValue, statusFilter, visibleColumns, onRowsPerPageChange, onSearchChange, onClear]);
    
    const bottomContent = React.useMemo(() => {
        return (
          <BottomContent
            selectedKeys={selectedKeys}
            itemsLength={items.length}
            page={page}
            pages={pages}
            // hasSearchFilter={hasSearchFilter}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
            onPageChange={setPage}
          />
        );
      }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <>
            <TableData
                headerColumns={headerColumns}
                bottomContent={bottomContent}
                selectedKeys={selectedKeys}
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
                sortedItems={sortedItems}
                renderCell={renderCell}
            />
            {pathname === '/admin/Product' && <ModalComponent isOpen={isOpen} onClose={onOpenChange} reload={reload}/>}
        </>
    );
};

export default App;
  
