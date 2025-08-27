class IRepository {
    async obtenerTodos() { throw new Error("Método 'obtenerTodos()' no implementado"); }
    async obtenerPorId(id) { throw new Error("Método 'obtenerPorId()' no implementado"); }
    async crear(data) { throw new Error("Método 'crear()' no implementado"); }
    async actualizarPorId(id, datos) { throw new Error("Método 'actualizarPorId()' no implementado"); }
    async eliminarPorId(id) { throw new Error("Método 'eliminarPorId()' no implementado"); }
}

export default IRepository;