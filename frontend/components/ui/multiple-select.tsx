'use client'

import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { FormControl } from './form'

const heightssss = [
  {
    name: '100 cm',
    value: '100',
  },
  {
    name: '120 cm',
    value: '120',
  },
  {
    name: '130 cm',
    value: '130',
  },
  {
    name: '140 cm',
    value: '140',
  },
  {
    name: '150 cm',
    value: '150',
  },
]

interface MultipleSelectProps {
  field: ControllerRenderProps<
    {
      heights: string[]
    },
    'heights'
  >
  form: UseFormReturn<
    {
      heights: string[]
    },
    any,
    undefined
  >
}

export function MultipleSelect({ field, form }: MultipleSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [heights, setHeights] = React.useState<string[]>([])

  const handleSelect = (value: string) => {
    const checkExist = !!heights.find(
      (height) => (height as string).toLowerCase() === value.toLowerCase()
    )

    if (!checkExist) {
      setHeights(heights.concat(value))
    } else {
      setHeights(heights.filter((height) => height.toLowerCase() !== value.toLowerCase()))
    }

    setOpen(false)
  }

  const handleRemoveItem = (value: string) => {
    setHeights(heights.filter((height) => height.toLowerCase() !== value.toLowerCase()))
  }

  React.useEffect(() => {
    form.setValue('heights', heights)
  }, [heights])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
          >
            {field.value.length !== 0
              ? field.value.map((item) => (
                  <div
                    className="border p-1 hover:border-red-500"
                    onClick={() => alert(item)}
                    key={item}
                  >
                    {item}
                  </div>
                ))
              : 'Select framework...'}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl> */}
        <FormControl>
          <div
            className={cn(
              'w-full overflow-auto space-x-2 border border-input bg-background flex items-center cursor-default px-2 py-1',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value.length !== 0 ? (
              field.value.map((item) => (
                <div
                  className="border p-1 flex items-center space-x-2 rounded bg-gray-200 cursor-pointer"
                  onClick={() => handleRemoveItem(item)}
                  key={item}
                >
                  <p>{item}</p>
                  <XIcon className="w-4 h-4 font-bold" />
                </div>
              ))
            ) : (
              <p>Select framework...</p>
            )}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => handleSelect(currentValue)}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    field.value.find((item) => item === framework.value)
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
