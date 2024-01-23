import { useAtom } from "jotai";
import React from "react";
import { selectedMarketIdAtom } from "../Market";
import { useSubscription } from "@apollo/client";
import { RECENT_MARKET_POSITIONS_SUBSCRIPTION } from "@/api/queries";
import { RecentPositionTypeResponse } from "@/types/positionTypes";
import { RecentTradesItem } from "./RecentTradesItem";

export const RecentTrades = () => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);

  const { data: recentPositionsRes } =
    useSubscription<RecentPositionTypeResponse>(
      RECENT_MARKET_POSITIONS_SUBSCRIPTION,
      {
        variables: { marketId: selectedMarketId },
      }
    );

  const numberOfTrades = recentPositionsRes
    ? recentPositionsRes.positions.length
    : 0;
  const placeholders = Array.from({ length: 10 - numberOfTrades });

  return (
    <div className="w-full h-[400px]">
      {recentPositionsRes && (
        <table className="table-auto w-full h-full">
          <thead className="bg-secondary-bg text-xs text-left text-[#ABACBA]">
            <tr>
              <th className="font-normal py-4 pl-3">Quantity</th>
              <th className="font-normal">Price</th>
            </tr>
          </thead>
          <tbody>
            {recentPositionsRes.positions.map((position, key) => (
              <RecentTradesItem position={position} key={key} />
            ))}
            {placeholders.map((_, key) => (
              <tr className=" odd:bg-[#23252E] text-[#7F828F]" key={key}>
                <td className="">&nbsp;</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};