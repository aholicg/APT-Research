.386
.model flat, stdcall
option casemap:none

include windows.inc
include kernel32.inc
includelib kernel32.lib

maxpath = 260 ; 260=max size allowed for win file path
filemax = 8192
max = 10 ; largest 32-bit integer is 10-digit

.data
hstdin DWORD ?
hstdout DWORD ?
fpbuffer BYTE maxpath DUP(?) 
                         ; duplicate ?=uninitialized value
                         ; for all 260 bytes.
fpread DWORD ?
hfile DWORD ?
chbuffer BYTE ? ; ReadConsole's buffer. uninitialized value
chread DWORD ?
filebuffer BYTE filemax DUP(?) 
fileread DWORD ?
outbuffer BYTE max DUP(?)
count DWORD ?
outwritten DWORD ?

.code
main PROC
INVOKE GetStdHandle, STD_INPUT_HANDLE
mov hstdin, eax ; handle returned to eax. Ref: table 4 - agner's.

INVOKE ReadConsole, hstdin, ADDR fpbuffer, maxpath, ADDR fpread, 0
INVOKE ReadConsole, hstdin, ADDR chbuffer, 1, ADDR chread, 0

mov eax, fpread
sub eax, 2 ; trimming \r\n.
mov fpbuffer[eax], 0 ; filepath[fpsize]=0

INVOKE CreateFileA, ADDR fpbuffer, GENERIC_READ, FILE_SHARE_READ, 0, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, 0
mov hfile, eax
INVOKE ReadFile, hfile, ADDR filebuffer, filemax, ADDR fileread, 0 

mov esi, OFFSET filebuffer ; esi as iterator pointer
; loop formally known as "Loop According to ECX Counter".
mov ecx, fileread ; loop time=file's byte.
mov edx, 0 ; counter.
L1:
mov al, [esi] ; al holds the iterator's byte value. 
cmp al, chbuffer
jne skip
inc edx
skip:
inc esi
loop L1
mov count, edx 

; convert edx's binary value into printable ascii
; div uses eax as quotient and edx as remainder as convention
mov ebx, 10
mov eax, count
mov edi, OFFSET outbuffer
L2:
mov edx, 0
div ebx
add dl, '0'
mov [edi], dl
inc edi
cmp eax, 0
jne L2

dec edi
mov esi, OFFSET outbuffer
INVOKE GetStdHandle, STD_OUTPUT_HANDLE
mov hstdout, eax
L3:
INVOKE WriteConsole, hstdout, edi, 1, ADDR outwritten, 0
cmp edi, esi
je done
dec edi
jmp L3

done:
INVOKE CloseHandle, hfile
INVOKE ExitProcess, 0
main ENDP
END main
