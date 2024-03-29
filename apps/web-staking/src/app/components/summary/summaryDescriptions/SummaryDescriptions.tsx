import { Avatar } from "@nextui-org/react";
import React from "react";

import PoolRewards from "@/app/components/summary/summaryDescriptions/PoolRewards";
import PoolSocials from "@/app/components/summary/summaryDescriptions/PoolSocials";
import { useGetPoolInfoHooks } from "@/app/hooks/hooks";
import { PoolInfo } from "@/types/Pool";

import { ButtonBack } from "../../buttons/ButtonsComponent";
import { useRouter } from "next/navigation";
import SummaryAddress from "./SummaryAddress";

interface SummaryDescriptionsProps {
  poolInfo: PoolInfo;
  onClaim: () => void;
  transactionLoading: boolean;
}

const SummaryDescriptions = ({
  poolInfo,
  onClaim,
  transactionLoading,
}: SummaryDescriptionsProps) => {
  const {
    rewardsValues: { owner, keyholder, staker },
  } = useGetPoolInfoHooks();

  const router = useRouter();

  return (
    <>
      <div className="mt-[20px] flex w-full flex-col justify-between xl:flex-row">
        <div className=" flex w-full flex-col items-center md:items-start ">
          <div className="mb-14 hidden w-full xl:flex">
            <div className="mt-2 flex w-full justify-start">
              <ButtonBack
                btnText={"Back"}
                onClick={() => router.back()}
                extraClasses="h-[35px]"
              />
            </div>
            <PoolRewards
              poolInfo={poolInfo}
              onClaim={onClaim}
              transactionLoading={transactionLoading}
            />
          </div>
          <div className="flex w-full flex-col justify-between xl:flex-row">
            <div className="flex">
              <Avatar
                src={poolInfo?.meta?.logo}
                className="mr-5 min-h-[80px] min-w-[80px] md:size-[128px]"
              />
              <div>
                <span className="mt-1 text-[32px] font-bold leading-7 text-lightBlackDarkWhite">
                  {poolInfo?.meta?.name}
                </span>
                <PoolSocials poolInfo={poolInfo} />
              </div>
            </div>
            <div className="mt-5 flex w-full max-w-full flex-col md:flex-row xl:mt-0 xl:max-w-[340px] ">
              <PoolRewards
                poolInfo={poolInfo}
                onClaim={onClaim}
                transactionLoading={transactionLoading}
                extraClasses="xl:hidden md:max-w-[50%] mr-2"
              />
              <div
                className="mb-6 mr-2 flex h-[80px] w-full max-w-full items-center justify-between rounded-2xl border-1 border-silverMist px-5 py-3 xl:mb-0 xl:max-w-[340px] ">
                <div>
                  <span className="block text-xl font-medium">{owner}%</span>
                  <span className="block">Owner split</span>
                </div>
                <div>
                  <span className="block text-xl font-medium">
                    {keyholder}%
                  </span>
                  <span className="block">Key split</span>
                </div>
                <div>
                  <span className="block text-xl font-medium">{staker}%</span>
                  <span className="block">esXAI split</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full text-graphiteGray">
        {poolInfo?.meta?.description}
      </div>
      <SummaryAddress poolInfo={poolInfo} />
    </>
  );
};

export default SummaryDescriptions;
