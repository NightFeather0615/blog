import React, { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react';
import { IoMenu } from "react-icons/io5/index.js";
import DropdownMenuItem from "./DropdownMenuItem";

interface Props {
  tags: Array<string>
}

export default function DropdownMenu({ tags }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex justify-center rounded-md border border-sky-200 dark:border-gray-700 p-2 text-sm shadow-sm hover:bg-sky-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-gray-700 transition-colors"
          aria-label="menu"
        >
          <IoMenu className="h-5 w-5" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-sky-200 dark:border-gray-700 bg-sky-100 dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-sky-300 dark:divide-gray-500">
          <div className="py-1">
            <div className="px-3 py-2 uppercase font-bold text-xs">
              Tags
            </div>
            {tags.map((tag: any) => {
              return (
                <DropdownMenuItem
                  key={tag}
                  href={`/tags/${tag}`}
                >
                  {tag}
                </DropdownMenuItem>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}