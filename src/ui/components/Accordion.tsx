import * as React from "react";

export const Accordion = ({children: any}) => {
  return (
    <div className="flex items-center justify-center h-screen ">
        <div className="w-full px-8 mx-auto mt-20 space-y-2  lg:max-w-md">
            <details className="p-4 rounded-lg">
                <summary className="font-semibold bg-blue-200 px-4 py-2  text-lg cursor-pointer">Who is using TailwindCSS in production ?</summary>
                <div className=" bg-blue-100">
                    {/* <p className="leading-6 px-3 py-2 text-gray-800">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint inventore dolore autem libero numquam. Cupiditate provident, quae eos accusamus dolor ea optio quia voluptate distinctio eligendi repudiandae officia doloremque nesciunt?
                    </p> */}
                    {/* {children} */}
                </div>
            </details>
        </div>
    </div>
  );
};