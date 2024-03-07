import React from "react";
import { Button, Pagination } from "@nextui-org/react";

interface BottomContentProps {
    selectedKeys: Set<number> | string;
    itemsLength: number;
    page: number;
    pages: number;
    // hasSearchFilter: boolean;
    onPreviousPage: () => void;
    onNextPage: () => void;
    onPageChange: (page: number) => void;
}

const BottomContent: React.FC<BottomContentProps> = ({
    selectedKeys,
    itemsLength,
    page,
    pages,
    // hasSearchFilter,
    onPreviousPage,
    onNextPage,
    onPageChange,
}) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
            {selectedKeys instanceof Set ? (
                selectedKeys.size === itemsLength ? (
                    "All items selected"
                ) : (
                    `${selectedKeys.size} of ${itemsLength} selected`
                )
            ) : (
                "All items selected"
            )}
        </span>
        <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(newPage) => onPageChange(newPage)}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                Previous
            </Button>
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                Next
            </Button>
        </div>
    </div>
  );
};

export default BottomContent;
