'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from './scroll-area'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

type ComboboxProps = {
    title: string
    selected: string[]
    loading?: boolean
    setSelected: (selected: string[]) => void
    data: { label: string; value: string }[]
}

export function Combobox({ loading, title, selected, setSelected, data }: ComboboxProps) {
    const [open, setOpen] = React.useState(false)

    const filteredData = data.filter(item => !selected.includes(item.value))

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" disabled={loading} aria-expanded={open} className="w-full justify-between">
                    Select {title}...
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="max-w-[350px] p-0">
                <Command>
                    <CommandInput disabled={loading} placeholder={`Search ${title}...`} />
                    <CommandEmpty>No {title} found.</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            <ScrollArea className={cn(filteredData.length > 4 ? 'h-[150px]' : 'h-fit')}>
                                {filteredData.map(item => (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        disabled={loading}
                                        className="capitalize"
                                        onSelect={currentValue => {
                                            setSelected([...selected, currentValue])
                                            setOpen(false)
                                        }}>
                                        {item.label}
                                    </CommandItem>
                                ))}
                            </ScrollArea>
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
