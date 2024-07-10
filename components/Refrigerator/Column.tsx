"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { IRefrigerator, IIngredients } from "@/app/myrefrigerator/page";
import StickyNote from "./StickyNote";
import { Chip } from "@nextui-org/chip";
import { CgTrash } from "react-icons/cg";
import { deleteRefrigerator } from "./action";
import { UserContext } from "@/providers/userProvider";
import { useContext } from "react";
import { useRefrigeratorContext } from "@/app/myrefrigerator/provider";

interface ColumnProps {
  refrigerator: IRefrigerator;
}

const Column: React.FC<ColumnProps> = ({ refrigerator }) => {
  const { refrig, ingredients } = refrigerator;
  const { userData } = useContext(UserContext);
  const { setRefrig } = useRefrigeratorContext();

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

  function getColor(storage: number | null) {
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
    const data = await deleteRefrigerator(id, userData[0].id);
    setRefrig(data);
  }

  return (
    <Card className="w-full min-h-60" key={`ref_${refrig.refrigerator_id}`}>
      <CardHeader className="flex flex-row items-center justify-center gap-3">
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
