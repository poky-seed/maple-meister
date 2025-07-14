export function JsonResponse(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        status,
    });
}
