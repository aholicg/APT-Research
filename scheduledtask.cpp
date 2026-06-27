#define  _CRT_SECURE_NO_WARNINGS
#define _WIN32_DCOM
#include <Windows.h>
#include <iostream>
#include <stdio.h>
#include <comdef.h>
#include <taskschd.h>
#pragma comment(lib, "taskschd.lib")
#pragma comment(lib, "comsupp.lib")
using namespace std;

int __cdecl wmain(){
	HRESULT hr = CoInitializeEx(NULL, COINIT_MULTITHREADED);
	hr = CoInitializeSecurity(
		NULL,
		-1,
		NULL,
		NULL,
		RPC_C_AUTHN_LEVEL_PKT_PRIVACY,
		RPC_C_IMP_LEVEL_IMPERSONATE,
		NULL,
		0,
		NULL);

	LPCWSTR wszTaskName = L"Scheduled task at logon";
	wstring wstrExecutablePath = L"C:\\Users\\trang\\Documents\\Visual Studio 2013\\Projects\\msgbox1\\Debug\\msgbox1.exe";

	ITaskService *pService = NULL;
	hr = CoCreateInstance(CLSID_TaskScheduler,
		NULL,
		CLSCTX_INPROC_SERVER,
		IID_ITaskService,
		(void**)&pService);

	hr = pService->Connect(_variant_t(), _variant_t(), _variant_t(), _variant_t());

	ITaskFolder *pRootFolder = NULL;
	hr = pService->GetFolder(_bstr_t(L"\\"), &pRootFolder);

	ITaskDefinition *pTask = NULL;
	hr = pService->NewTask(0, &pTask);
	pService->Release();

	ITriggerCollection *pTriggerCollection = NULL;
	hr = pTask->get_Triggers(&pTriggerCollection);
	ITrigger *pTrigger = NULL;
	hr = pTriggerCollection->Create(TASK_TRIGGER_LOGON, &pTrigger);
	pTriggerCollection->Release();

	IActionCollection *pActionCollection = NULL;
	hr = pTask->get_Actions(&pActionCollection);
	IAction *pAction = NULL;
	hr = pActionCollection->Create(TASK_ACTION_EXEC, &pAction);
	pActionCollection->Release();
	IExecAction *pExecAction = NULL;
	hr = pAction->QueryInterface(IID_IExecAction, (void**)&pExecAction);
	pAction->Release();
	hr = pExecAction->put_Path(_bstr_t(wstrExecutablePath.c_str()));
	pExecAction->Release();

	//C:\Windows\System32\Tasks is the Physical Path on your NTFS file system. 
	//When your C++ code registers a task in the logical root folder (L"\\"), 
	//the Windows Task Scheduler service takes that COM object, translates it into an XML file, 
	//and automatically saves it inside C:\Windows\System32\Tasks for you.
	IRegisteredTask *pRegisteredTask = NULL;
	hr = pRootFolder->RegisterTaskDefinition(
		_bstr_t(wszTaskName),
		pTask,
		TASK_CREATE_OR_UPDATE,
		_variant_t(),
		_variant_t(),
		TASK_LOGON_INTERACTIVE_TOKEN, //do like example code would result in admin-only program and msgbox would run in background.
		_variant_t(L""),
		&pRegisteredTask);

	pRootFolder->Release();
	pTask->Release();
	pRegisteredTask->Release();
	CoUninitialize();

	return 0;
}