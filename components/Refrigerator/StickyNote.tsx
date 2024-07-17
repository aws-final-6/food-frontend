import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";
import { CgSmartHomeRefrigerator, CgTrash, CgTimer } from "react-icons/cg";
import clsx from "clsx";
import { IIngredients } from "@/app/myrefrigerator/page";
import { deleteNote } from "./action";
import { UserContext } from "@/providers/userProvider";
import { useContext } from "react";
import { useRefrigeratorContext } from "@/app/myrefrigerator/provider";
import dayjs from "dayjs";

const StickyNote: React.FC<IIngredients> = ({
  refrigerator_ing_name,
  expired_date,
  enter_date,
  color,
  refrigerator_ing_id,
}) => {
  const { userData } = useContext(UserContext);
  const { setRefrig } = useRefrigeratorContext();

  async function deleteCards(cardId: number) {
    if (userData) {
      const data = await deleteNote(cardId, userData.id);
      setRefrig(data);
    }
  }

  const expiredDate = dayjs(expired_date);
  const today = dayjs();
  const diffDays = expiredDate.diff(today, "day");

  return (
    <div
      className={clsx(
        `rounded border w-42 h-40 p-5 flex flex-col justify-between`,
        color,
        {
          "border-3 border-red animate-flash-red": diffDays <= 0,
          "border-3 border-orange animate-flash-orange":
            diffDays > 0 && diffDays < 7,
        }
      )}
    >
      <div>
        <div className="flex flex-row justify-between">
          <p className="font-gaegu">{""}</p>
          <CgTrash
            className="hover:text-red-500 hover:cursor-pointer z-10"
            onClick={() => {
              deleteCards(refrigerator_ing_id);
            }}
          />
        </div>
        <p className="font-gaegu">{refrigerator_ing_name}</p>
      </div>
      <div className="flex flex-row gap-1/12 w-33 justify-center items-center">
        <Tooltip key={refrigerator_ing_name} content={"냉장고에 넣은 날"}>
          <Chip
            size="sm"
            className="font-gaegu text-black font-bold"
            color="warning"
            variant="light"
            startContent={<CgSmartHomeRefrigerator />}
          >
            {enter_date}
          </Chip>
        </Tooltip>
        <Tooltip key={refrigerator_ing_name + "out"} content={"유통기한"}>
          <Chip
            size="sm"
            className="font-gaegu text-black font-bold"
            color="warning"
            variant="light"
            startContent={<CgTimer />}
          >
            {expired_date}
          </Chip>
        </Tooltip>
      </div>
    </div>
  );
};

export default StickyNote;
