<?php

namespace App\Http\Controllers;

use App\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index()
     {
         return Unit::all();
     }
 
     /**
      * Display a listing of the resource.
      *
      * @return \Illuminate\Http\Response
      */
     public function list()
     {
         return Unit::select(['short_name as label', 'id as value'])
                                 ->where('id', '!=',  4)
                                 ->get();
     }
}
