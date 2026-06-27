#include <windows.h>
#include <string.h>

int main(int argc, char *argv[]){
	HKEY hkey = NULL;
	const char *exe = "C:\\Users\\trang\\Documents\\Visual Studio 2013\\Projects\\msgbox\\Debug\\msgbox.exe";

	//need to use RegOpenKeyExA instead of RegOpenKeyEx
	LONG res = RegOpenKeyExA(HKEY_CURRENT_USER, (LPCSTR)"SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run", 0, KEY_WRITE, &hkey);
	if (res == ERROR_SUCCESS){
		RegSetValueEx(hkey, (LPCSTR)"msgbox", 0, REG_SZ, (unsigned char*)exe, strlen(exe));
		RegCloseKey(hkey);
	}
	return 0;
}