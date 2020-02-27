import axios from "axios";

export class CategoryService {
    async getCategories() {
        return axios.get("/api/category").then(res => res.data);
    }

    async saveCategory(category) {
        return axios
            .post("/api/category", { ...category })
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                throw error;
            });
    }

    async deleteCategory(id) {
        return axios
            .delete("/api/category/" + id)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                throw error;
            });
    }
}
