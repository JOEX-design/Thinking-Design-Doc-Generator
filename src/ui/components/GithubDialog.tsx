import * as React from "react";
import {Button} from "./Button";
import {Input} from "./Input";
import {Loading} from "./Loading";
import {Result} from "./Result";
import {useState, useContext} from 'react';
import {SettingContext} from "../context/SettingContext";
import commitToGithub from "../../modules/commitToGithub";


export const GithubDialog = (jsonObject) => {
  const { setting, setSetting} = useContext(SettingContext)
  const componentFullName = jsonObject.jsonObject.definition.componentName.replace(/[\W_]+/g, " ");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [gitLink, setGitlink] = useState('');

  const [formData, setFormData] = useState({gitToken: setting.git_token, filePath: componentFullName.concat(".json"), repo: setting.git_repo, owner: setting.git_owner});
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setGitlink(`https://github.com/${formData?.owner}/${formData?.repo}`)
    setSetting({
      git_token: formData.gitToken,
      git_repo: formData.repo,
      git_owner: formData.owner,
    })
    parent.postMessage({ pluginMessage: { type: 'saveSettings', data:{
      git_token: formData.gitToken,
      git_repo: formData.repo,
      git_owner: formData.owner, 
    } } }, '*')

    await commitToGithub({
      ...formData
    }, jsonObject).then(i => {
      setIsLoading(false)
      setSyncStatus('success')
    }).catch(e => {
      console.log(e)
      setIsLoading(false)
      setSyncStatus('fail')
    })
  };

  return (
    <>
      <Button variant="secondary"
        onClick={
          () => setShowModal(true)
        }
        className="mb-6">🚀 同步至Github</Button>
      {
      showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <div className="relative w-11/12 my-6 mx-9x">
              <form className="border-0 rounded-xl shadow-lg shadow-black-300 relative flex flex-col w-full bg-white outline-none focus:outline-none"
                onSubmit={handleSubmit}>
                <div className="flex items-center justify-between px-6 py-2 border-b border-solid border-slate-200 rounded-t ">
                  <h3 className="text-md text-slate-600 font-medium w">同步至 Github</h3>
                  <Button variant="iconBtn"
                    isDisabled={isLoading}
                     onClick={() => { setShowModal(false); setSyncStatus('') }}>
                    ✕
                  </Button>
                </div>
                <div className="relative flex-auto">
                  {
                  isLoading ? (
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 bg-slate-100/80 w-full h-full">
                      <Loading text="同步中..."/>
                    </div>
                  ) : null
                }
                  {
                  syncStatus === 'success' ? (
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 bg-slate-100 w-full h-full">
                      <Result text="同步成功" status="success" link={gitLink}/>
                    </div>
                  ) : null
                }
                  {
                  syncStatus === 'fail' ? (
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 bg-slate-100 w-full h-full">
                      <Result text="同步失败" status="fail"  link={gitLink}/>
                    </div>
                  ) : null
                }


                  <div className="px-8 pt-6 w-full"
                    onSubmit={handleSubmit}>
                    <Input name="gitToken" label="Github Token" placeholder="请输入Github Token"
                      value={
                        formData.gitToken
                      }
                      onChange={handleInputChange}/>
                    <Input name="filePath" label="导出的文件名" placeholder="****.json"
                      value={
                        formData.filePath
                      }
                      onChange={handleInputChange}/>
                    <Input name="repo" label="Github 仓库名" placeholder="请输入"
                      value={
                        formData.repo
                      }
                      onChange={handleInputChange}/>
                    <Input name="owner" label="Github 仓库创建人" placeholder="请输入"
                      value={
                        formData.owner
                      }
                      onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="flex items-center justify-end px-6 py-3 border-t border-solid border-slate-200 rounded-b">
                  {
                      syncStatus !== '' ? (<Button variant="primary" onClick={() => { setShowModal(false); setSyncStatus('') }}> 结束 </Button>) : (
                        <div className="flex items-center gap-2">
                          <Button variant="secondary"
                            isDisabled={isLoading}
                            onClick={
                              () => setShowModal(false)
                          }>
                            取消
                          </Button>
                          <Button variant="primary" type="submit"
                            isDisabled={isLoading}>
                            开始同步
                          </Button>
                      </div>
                    )
                  }
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null
    } </>
  );
};
