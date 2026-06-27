#include <windows.h>
#include <stdio.h>
#include <iostream>
#include <string.h>
#include <Shlobj.h>

//no need of separate msgbox.exe anymore.
int WINAPI WinMain(HINSTANCE hinstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow){
	MessageBoxA(NULL, "Startup folder", "Persistence", MB_OK);

	WCHAR szCurrentPath[MAX_PATH];
	GetModuleFileNameW(NULL, szCurrentPath, MAX_PATH);

	WCHAR szStartupPath[MAX_PATH];
	SHGetFolderPathW(NULL, CSIDL_STARTUP, NULL, 0, szStartupPath);

	lstrcatW(szStartupPath, L"\\startupfolder.exe");
	CopyFileW(szCurrentPath, szStartupPath, FALSE);

	return 0;
}