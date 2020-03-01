<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list()
    {
        return Category::select(['name as label', 'id as value'])->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->id) {
            $category = Category::find($request->id);
        } else {
            $category = new Category;
        }
        $category->name = $request->name;
        $category->code = "CAT_" . strtoupper(substr(trim($request->name), 0, 3));
        $category->description = $request->description;
        $category->save();
        return $category;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        return Category::destroy($id);
    }
}
