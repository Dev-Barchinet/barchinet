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

import { getApiArchitectCities } from "@/services/architect-services/api-architect-cities-get";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetApiArchitectCitiesId } from "@/services/architect-services/api-architect-cities-{id}-get";

type CitySelectProps = {
    placeholder?: string;
    countryId?: string;
    stateId?: string;
    onValueChange: (value: string) => void;
    label: string;
    value?: string | null;
};

export function CitySelect({
    placeholder,
    label,
    countryId,
    onValueChange,
    value: previousValue,
    stateId,
}: CitySelectProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(previousValue || "");
    const [searchTerm, setSearchTerm] = React.useState("");

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery(
            ["cities", searchTerm, countryId],
            ({ pageParam = 0 }) =>
                getApiArchitectCities({
                    CountryId: countryId,
                    StateId: stateId,
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
                enabled: Boolean(stateId) && Boolean(countryId) && open,
            }
        );

    const cities = data?.pages.flatMap(
        (page) =>
            page.value?.items?.map((city) => ({
                value: city.id || "",
                label: city.name || "Unnamed City",
            })) || []
    );

    const { data: cityInfo, isLoading: fetchingCityInfo } =
        useGetApiArchitectCitiesId(previousValue || "", {
            query: { enabled: Boolean(previousValue && !cities) },
        });

    const handleSelect = (city: { value: string; label: string }) => {
        setValue(city.value === value ? "" : city.value);
        setOpen(false);
        onValueChange(city.value);
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

    const getCityInfo = (cities?: { value: string; label: string }[]) => {
        if (cities && cities.length > 0 && value) {
            return (
                cities.find((city) => city.value === value)?.label ||
                cityInfo?.value?.name
            );
        } else {
            return cityInfo?.value?.name;
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
                        loading={fetchingCityInfo}
                        disabled={!Boolean(stateId) || !Boolean(countryId)}
                    >
                        {value
                            ? getCityInfo(cities) || placeholder
                            : placeholder}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <Input
                        placeholder="Search city..."
                        className="h-9"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <CommandList onScroll={handleScroll}>
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandGroup>
                            {cities?.map((city) => (
                                <CommandItem
                                    key={city.value}
                                    value={city.value}
                                    onSelect={() => handleSelect(city)}
                                >
                                    {city.label}
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
