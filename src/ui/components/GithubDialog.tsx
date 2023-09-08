import * as React from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { useState, useEffect } from 'react';
import commitToGithub from "../../modules/commitToGithub";


export const GithubDialog = (jsonObject) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    gitToken: '',
    filePath: '',
    repo: 'Tikit-Design-Doc-Data',
    owner: 'JOEX-Design'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you can perform actions like sending the form data to a server or handling it as needed.
    const componentFullName = jsonObject.jsonObject.definition.componentName.replace(/[\W_]+/g," ");
    componentFullName.concat(".json")
    console.log(componentFullName)
    await commitToGithub({...formData}, jsonObject)
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShowModal(true)} className="mb-6">🔫 同步至Github</Button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className="relative w-11/12 my-6 mx-9x">
              <form className="border-0 rounded-xl shadow-lg shadow-black-300 relative flex flex-col w-full bg-white outline-none focus:outline-none" onSubmit={handleSubmit}>
                <div className="flex items-center justify-between px-6 py-2 border-b border-solid border-slate-200 rounded-t ">
                    <h3 className="text-md text-slate-600 font-medium w">同步至 Github</h3>
                    <Button variant="iconBtn" onClick={() => setShowModal(false)}> ✕ </Button>
                </div>
                <div className="relative flex-auto">
                  <div className="px-8 pt-6 w-full" onSubmit={handleSubmit}>
                    <Input name="gitToken" label="Github Token" placeholder="请输入Github Token" value={formData.gitToken} onChange={handleInputChange}/>
                    <Input name="filePath" label="导出的文件名" placeholder="****.json" value={formData.filePath} onChange={handleInputChange}/>
                    <Input name="repo" label="Github 仓库名" placeholder="请输入" value={formData.repo} onChange={handleInputChange}/>
                    <Input name="owner" label="Github 仓库创建人" placeholder="请输入" value={formData.owner} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="flex items-center justify-end px-6 py-3 border-t border-solid border-slate-200 rounded-b gap-2">
                  <Button variant="secondary" onClick={() => setShowModal(false)}> 取消 </Button>
                  <Button variant="primary" type="submit"> 开始同步 </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};