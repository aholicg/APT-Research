#include <windows.h>

int WINAPI WinMain(HINSTANCE hinstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow){
	MessageBoxA(NULL, "Scheduled task", "Persistence", MB_OK);
	return 0;
}
