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

import { getApiArchitectCountries } from "@/services/architect-services/api-architect-countries-get"; // Adjust this import to your actual service
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetApiArchitectCountriesId } from "@/services/architect-services/api-architect-countries-{id}-get";

type CountrySelectProps = {
    placeholder?: string;
    onValueChange: (value: string) => void;
    label: string;
    value?: string | null;
};

export function CountrySelect({
    placeholder = "Select country...",
    label,
    onValueChange,
    value: previousValue,
}: CountrySelectProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(previousValue || "");
    const [searchTerm, setSearchTerm] = React.useState("");

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery(
            ["countries", searchTerm],
            ({ pageParam = 0 }) =>
                getApiArchitectCountries({
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
                enabled: open,
            }
        );

    const countries = data?.pages.flatMap(
        (page) =>
            page.value?.items?.map((country) => ({
                value: country.id || "",
                label: country.name || "Unnamed Country",
            })) || []
    );

    const { data: countryInfo, isLoading: fetchingCountryInfo } =
        useGetApiArchitectCountriesId(previousValue || "", {
            query: { enabled: Boolean(previousValue && !countries) },
        });

    const handleSelect = (country: { value: string; label: string }) => {
        setValue(
            (country.value === value ? "" : country.value) ||
                previousValue ||
                ""
        );
        setOpen(false);
        onValueChange(country.value);
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

    const getCountryInfo = (
        countries?: {
            value: string;
            label: string;
        }[]
    ) => {
        if (countries && countries.length > 0) {
            return (
                countries.find((country) => country.value === value)?.label ||
                countryInfo?.value?.name
            );
        } else {
            return countryInfo?.value?.name;
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div>
                    <Label>{label}</Label>
                    <Button
                        variant="outline"
                        type="button"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between"
                        loading={fetchingCountryInfo}
                    >
                        {value || previousValue
                            ? getCountryInfo(countries) || placeholder
                            : placeholder}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <Input
                        placeholder="Search country..."
                        className="h-9"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <CommandList onScroll={handleScroll}>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                            {countries?.map((country) => (
                                <CommandItem
                                    key={country.value}
                                    value={country.value}
                                    onSelect={() => handleSelect(country)}
                                >
                                    {country.label}
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
