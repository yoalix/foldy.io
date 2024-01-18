"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { DragReorder } from "../icons/drag-reorder";
import { Link } from "@/lib/supabase/db";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { deleteLinksAction } from "@/actions/deleteLinks";
import { updateLinksAction } from "@/actions/updateLinks";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

type ItemProps = {
  title?: string | null;
  subtitle: string;
  id: string;
  onDeleteClick: (id: string) => void;
};

const Item = ({ id, title, subtitle, onDeleteClick }: ItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
    isSorting,
  } = useSortable({ id });

  const dragStyle = `${isDragging ? " scale(1.1)" : ""}`;
  const style = {
    transform:
      isSorting == false ? "" : CSS.Translate.toString(transform) + dragStyle,
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 my-3 hover:scale-105 active:scale-105 ${
        isDragging ? " active:scale-105 " : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <Button variant="ghost" size="icon">
        <DragReorder />
      </Button>
      <div className="flex w-full justify-start items-center gap-2">
        <Image src="/icons/link.png" alt="folder" width={24} height={24} />
        <div>
          <h1 className="font-normal">{title}</h1>
          <p className="text-black-secondary ">{subtitle}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(id);
        }}
      >
        <Image src="/icons/trashred.png" alt="trash icon" />
      </Button>
    </div>
  );
};

const activationConstraint = {
  delay: 150,
  tolerance: 5,
};
export const EditLinks = ({
  links: initialLinks,
  username,
  folderId,
}: {
  links: Link[] | null;
  username: string;
  folderId: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [links, setLinks] = useState(initialLinks || []);
  const [linksToDelete, setLinksToDelete] = useState<string[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint }),
    useSensor(TouchSensor, { activationConstraint }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setLinks((items) => {
        const oldIndex = items?.findIndex((v) => v.id == active.id);
        const newIndex = items?.findIndex((v) => v.id == over.id);

        return arrayMove(items, oldIndex, newIndex).map((link, index) => ({
          ...link,
          order: index,
        }));
      });
    }
  };

  const handleDelete = (linkId: string) => {
    setLinks((links) =>
      links
        .filter((link) => link.id !== linkId)
        .map((link, index) => ({
          ...link,
          order: index,
        }))
    );
    setLinksToDelete((links) => [...links, linkId]);
  };

  const handleSave = async () => {
    try {
      const hasDelete = linksToDelete.length > 0;
      if (hasDelete) {
        await deleteLinksAction(linksToDelete);
      }
      const hasLinksChanged = links.some(
        (link, index) => link.order !== initialLinks?.[index].order
      );
      if (hasDelete || hasLinksChanged) {
        await updateLinksAction(links);
      }
      toast({
        title: "Success",
        description: "Links updated",
      });
      router.push(`/profile/${username}/folder/${folderId}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      <Button
        className="absolute top-[-68px] right-0 text-urgent hover:text-urgent"
        variant="ghost"
        onClick={handleSave}
      >
        Done
      </Button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={links} strategy={verticalListSortingStrategy}>
          {links?.map((link) => (
            <Item
              key={`link-${link.id}`}
              id={link.id}
              title={link.name}
              subtitle={link.url}
              onDeleteClick={handleDelete}
            />
          )) || null}
        </SortableContext>
      </DndContext>
    </div>
  );
};
