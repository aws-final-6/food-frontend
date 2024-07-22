"use client";
import { useState, useContext } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { IRefrigerator, IIngredients } from "@/app/myrefrigerator/page";
import StickyNote from "./StickyNote";
import { Chip } from "@nextui-org/chip";
import { CgTrash, CgPen } from "react-icons/cg";
import { deleteRefrigerator, updateRefrigerator } from "./action";
import { UserContext } from "@/providers/userProvider";
import { useRefrigeratorContext } from "@/app/myrefrigerator/provider";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
interface ColumnProps {
  refrigerator: IRefrigerator;
}

const Column: React.FC<ColumnProps> = ({ refrigerator }) => {
  const { refrig, ingredients } = refrigerator;
  const { userData } = useContext(UserContext);
  const { setRefrig } = useRefrigeratorContext();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(refrig.refrigerator_name);
  const [editType, setEditType] = useState<number>(refrig.refrigerator_type);

  function getStorageType(storage: number | null): string {
    switch (storage) {
      case 1:
        return "냉장";
      case 2:
        return "냉동";
      case 3:
        return "실온";
      default:
        throw new Error("Invalid storage type");
    }
  }

  function getColor(
    storage: number | null
  ): "primary" | "secondary" | "warning" {
    switch (storage) {
      case 1:
        return "primary";
      case 2:
        return "secondary";
      case 3:
        return "warning";
      default:
        throw new Error("Invalid storage type");
    }
  }

  async function deleteCol(id: number) {
    if (userData) {
      const data = await deleteRefrigerator(id, userData.id);
      setRefrig(data);
    }
  }

  const handleSave = async () => {
    // Update the refrigerator context with new name and type
    setRefrig((prevRefrig: any) => {
      if (!prevRefrig) return prevRefrig;

      const updatedRefrigerators = prevRefrig.refrigerators.map((item: any) =>
        item.refrig.refrigerator_id === refrig.refrigerator_id
          ? {
              ...item,
              refrig: {
                ...item.refrig,
                refrigerator_name: editName,
                refrigerator_type: editType,
              },
            }
          : item
      );

      return { ...prevRefrig, refrigerators: updatedRefrigerators };
    });
    if (userData && editType) {
      const data = await updateRefrigerator(
        userData.id,
        refrig.refrigerator_id,
        editName,
        editType
      );
    }

    setIsEditing(false);
  };

  return (
    <Card className="w-full min-h-60" key={`ref_${refrig.refrigerator_id}`}>
      <CardHeader className="flex flex-row items-center justify-center gap-3">
        {isEditing ? (
          <>
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <Select
              value={editType || 1}
              onChange={(e) => setEditType(Number(e.target.value))}
              defaultSelectedKeys={[editType.toString()]}
            >
              <SelectItem key={1}>냉장</SelectItem>
              <SelectItem key={2}>냉동</SelectItem>
              <SelectItem key={3}>실온</SelectItem>
            </Select>
            <Button color="warning" variant="flat" onClick={handleSave}>
              저장
            </Button>
          </>
        ) : (
          <>
            <p>{refrig.refrigerator_name}</p>
            <Chip variant="flat" color={getColor(refrig.refrigerator_type)}>
              {getStorageType(refrig.refrigerator_type)}
            </Chip>
            <CgTrash
              className="hover:text-red-500 hover:cursor-pointer z-10"
              onClick={() => {
                deleteCol(refrig.refrigerator_id);
              }}
            />
            <CgPen
              className="hover:text-orange-500 hover:cursor-pointer z-10"
              onClick={() => setIsEditing(true)}
            />
          </>
        )}
      </CardHeader>
      <CardBody className="grid sm:grid-cols-3 grid-cols-2 gap-4">
        {ingredients.map((ing: IIngredients, index: number) => (
          <StickyNote key={index} {...ing} />
        ))}
      </CardBody>
    </Card>
  );
};

export default Column;
