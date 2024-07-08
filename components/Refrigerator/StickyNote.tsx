import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";
import { CgSmartHomeRefrigerator, CgTrash, CgTimer } from "react-icons/cg";
import clsx from "clsx";

export interface CardProps {
  refrigerator_ing_name: string;
  expired_date: string;
  enter_date: string;
  color: string;
}

const StickyNote: React.FC<CardProps> = ({
  refrigerator_ing_name,
  expired_date,
  enter_date,
  color,
}) => {
  function deleteCards(cardId: number) {
    // setCards((pv) =>
    //   pv.filter((c) => `ref_${c.refrigerator_id}` !== `ref_${cardId}`)
    // );
  }

  return (
    <div
      className={clsx(
        `rounded border w-42 h-40 p-5 flex flex-col justify-between`,
        color
      )}
    >
      <div>
        <div className="flex flex-row justify-between">
          <p className="font-gaegu">{""}</p>
          {/* <CgTrash
            className="hover:text-red-500 hover:cursor-pointer z-10"
            onClick={() => {
              deleteCards(refrigerator_ing_id);
            }}
          /> */}
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
