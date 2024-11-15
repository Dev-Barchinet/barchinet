"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { useInfiniteQuery } from "react-query";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { getApiArchitectStates } from "@/services/architect-services/api-architect-states-get"; // Adjust the API endpoint
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetApiArchitectStatesId } from "@/services/architect-services/api-architect-states-{id}-get";

type StateSelectProps = {
    placeholder?: string;
    countryId?: string;
    onValueChange: (value: string) => void;
    label: string;
    value?: string | null;
};

export function StateSelect({
    placeholder,
    label,
    countryId,
    onValueChange,
    value: previousValue,
}: StateSelectProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(previousValue || "");
    const [searchTerm, setSearchTerm] = React.useState("");

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery(
            ["states", searchTerm, countryId],
            ({ pageParam = 0 }) =>
                getApiArchitectStates({
                    CountryId: countryId,
                    PageIndex: pageParam,
                    PageSize: 10,
                    Name: searchTerm,
                }),
            {
                getNextPageParam: (lastPage, allPages) => {
                    const totalItems = lastPage?.value?.totalCount || 0;
                    const loadedItems = allPages.flatMap(
                        (page) => page.value?.items || []
                    ).length;
                    return loadedItems < totalItems
                        ? allPages.length + 1
                        : undefined;
                },
                enabled: Boolean(countryId) && open,
            }
        );

    const states = data?.pages.flatMap(
        (page) =>
            page.value?.items?.map((state) => ({
                value: state.id || "",
                label: state.name || "Unnamed State",
            })) || []
    );

    const { data: stateInfo, isLoading: fetchingStateInfo } =
        useGetApiArchitectStatesId(previousValue || "", {
            query: { enabled: Boolean(previousValue && !states) },
        });

    const handleSelect = (state: { value: string; label: string }) => {
        setValue(state.value === value ? "" : state.value);
        setOpen(false);
        onValueChange(state.value);
    };

    const handleSearch = (search: string) => {
        setSearchTerm(search);
    };

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.currentTarget;
        if (
            target.scrollTop + target.clientHeight >=
                target.scrollHeight - 10 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    };

    const getStateInfo = (states?: { value: string; label: string }[]) => {
        if (states && states.length > 1) {
            return (
                states.find((s) => s.value === value)?.label ||
                stateInfo?.value?.name
            );
        } else {
            return stateInfo?.value?.name;
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div>
                    <Label>{label}</Label>
                    <Button
                        variant="outline"
                        role="combobox"
                        type="button"
                        aria-expanded={open}
                        className="justify-between"
                        loading={fetchingStateInfo}
                        disabled={!Boolean(countryId)}
                    >
                        {value
                            ? getStateInfo(states) || placeholder
                            : placeholder}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <Input
                        placeholder="Search state..."
                        className="h-9"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <CommandList onScroll={handleScroll}>
                        <CommandEmpty>No state found.</CommandEmpty>
                        <CommandGroup>
                            {states?.map((state) => (
                                <CommandItem
                                    key={state.value}
                                    value={state.value}
                                    onSelect={() => handleSelect(state)}
                                >
                                    {state.label}
                                </CommandItem>
                            ))}
                            {isFetchingNextPage && (
                                <div className="p-2 text-center text-sm text-gray-500">
                                    Loading more...
                                </div>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
