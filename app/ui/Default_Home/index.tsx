import { FC } from 'react';
import Image from 'next/image';
import santaclaus from './santa-claus.png';

const Default = () => {
  return (
    <div className="flex w-0 flex-1 flex-col overflow-hidden bg-red-500">
      <main className="relative flex-1">
        <div className="py-6">
          <div className="px-4 sm:px-6 md:px-8">
            <h2 className="text-center text-3xl font-bold text-white">
              Welcome to Fireproof Secret Santa
            </h2>
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center">
                <Image src={santaclaus} alt="Picture of the Santa claus" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">
                Instructions
              </h3>
              <ul className="mt-4 list-inside list-disc text-center text-lg text-white">
                <li>Main Instruction Heading</li>
                <li>Instruction-1</li>
                <li>Instruction-2</li>
                <li>Instruction-3</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Default;
