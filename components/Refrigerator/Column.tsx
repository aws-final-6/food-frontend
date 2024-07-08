import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { IColumn, IIngredients } from "@/app/myrefrigerator/page";
import StickyNote from "./StickyNote";
import { Chip } from "@nextui-org/chip";

const Column: React.FC<IColumn> = ({
  refrigerator_name,
  refrigerator_type,
  refrigerator_id,
  ingredients,
}) => {
  function getStorageType(storage: number | null): string {
    switch (storage) {
      case 0:
        return "냉장";
      case 1:
        return "냉동";
      case 2:
        return "실온";
      default:
        throw new Error("Invalid storage type");
    }
  }

  function getColor(storage: number | null) {
    switch (storage) {
      case 0:
        return "primary";
      case 1:
        return "secondary";
      case 2:
        return "warning";
      default:
        throw new Error("Invalid storage type");
    }
  }
  return (
    <Card className="w-full min-h-60" key={`ref_${refrigerator_id}`}>
      <CardHeader className="flex flex-row items-center justify-center gap-3">
        <p>{refrigerator_name}</p>
        <Chip variant="flat" color={getColor(refrigerator_type)}>
          {getStorageType(refrigerator_type)}
        </Chip>
      </CardHeader>
      <CardBody className="grid sm:grid-cols-3 grid-cols-2 gap-4">
        {ingredients.map((ing: IIngredients, index: number) => (
          <StickyNote {...ing} />
        ))}
      </CardBody>
    </Card>
  );
};

export default Column;
